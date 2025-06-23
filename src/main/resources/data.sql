INSERT INTO users (username, email, password) VALUES
('admin', 'admin@mail.arorms.cn', '$2a$10$n8GKTB7tU1MbOvCgAZ1u0.1N2hUOnDoQsbHaZuJkv1d7vYy4n5oxe')
ON DUPLICATE KEY UPDATE username=username;