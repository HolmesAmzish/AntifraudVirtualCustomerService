-- User Table --
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Fraud Case Table --
CREATE TABLE IF NOT EXISTS fraud_case (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE,
    summary TEXT,
    verdict TEXT,
    significance TEXT
);

-- Initial data for fraud_case --
INSERT INTO fraud_case (title, date, summary, verdict, significance) VALUES
('Case 1', '2023-01-01', 'Summary 1', 'Verdict 1', 'Significance 1'),
('Case 2', '2023-01-02', 'Summary 2', 'Verdict 2', 'Significance 2'),
('Case 3', '2023-01-03', 'Summary 3', 'Verdict 3', 'Significance 3'),
('Case 4', '2023-01-04', 'Summary 4', 'Verdict 4', 'Significance 4'),
('Case 5', '2023-01-05', 'Summary 5', 'Verdict 5', 'Significance 5'),
('Case 6', '2023-01-06', 'Summary 6', 'Verdict 6', 'Significance 6'),
('Case 7', '2023-01-07', 'Summary 7', 'Verdict 7', 'Significance 7'),
('Case 8', '2023-01-08', 'Summary 8', 'Verdict 8', 'Significance 8'),
('Case 9', '2023-01-09', 'Summary 9', 'Verdict 9', 'Significance 9'),
('Case 10', '2023-01-10', 'Summary 10', 'Verdict 10', 'Significance 10');
