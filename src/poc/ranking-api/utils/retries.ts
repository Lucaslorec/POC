/**
 * Utility functions for handling retries and backoff
 */

/**
 * Retry a function with exponential backoff
 * @param fn Function to execute
 * @param retries Number of retries
 * @param delay Initial delay in ms
 * @param maxDelay Max delay in ms
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000,
    maxDelay: number = 30000
): Promise<T> {
    try {
        return await fn();
    } catch (error: any) {
        // Don't retry if we're out of retries or if it's not a rate limit error
        if (retries <= 0 || !(error.isRateLimited || error.response?.status === 429)) {
            throw error;
        }

        // Use the retry-after header if available, otherwise use exponential backoff
        const retryAfter = error.retryAfter ? error.retryAfter * 1000 : Math.min(delay, maxDelay);

        // Only log if not in silent mode
        if (process.env.DISABLE_LOGS !== 'true') {
            console.log(`Retrying request... (${retries} attempts left)`);
        }
        await new Promise(resolve => setTimeout(resolve, retryAfter));

        // Retry with exponential backoff
        return withRetry(fn, retries - 1, delay * 2, maxDelay);
    }
}
