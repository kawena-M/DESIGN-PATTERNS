export async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 500): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log("Hi");
            return await fn();
        } catch (error) {
            if (attempt === retries) {
                throw error; 
            }
            console.error(`Attempt ${attempt} failed: ${(error as Error).message}. Retrying in ${delay * attempt}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
    }
    throw new Error('Max retries reached');
}
