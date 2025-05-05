import 'dotenv/config';
import app from './app'

// env
const PORT = process.env.PORT || 3000;

// Start server
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // Exit the process with failure
}

