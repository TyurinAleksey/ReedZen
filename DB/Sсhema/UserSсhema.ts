const createUsersSchema = async (connection: any) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('user', 'admin', 'moderator') NOT NULL DEFAULT 'user',
            avatarUrl VARCHAR(255) DEFAULT NULL,
            isVerified BOOLEAN DEFAULT FALSE,
            lastLogin DATETIME NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    try {
        await connection.query(createTableQuery);
        console.log('Таблица пользователей создана или уже существует');
    } catch (error) {
        if (error.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log('Таблица users уже существует');
            return;
        }
        
        // Все другие ошибки пробрасываем дальше
        console.error('Критическая ошибка при работе с таблицей users:', error);
        throw error;
    }
};

export default createUsersSchema;