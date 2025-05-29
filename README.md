# Antifraud Virtual Customer Service

A Spring Boot application with AI-powered virtual customer service capabilities, 
integrated with ChromaDB for vector search functionality.

## Features

- Java Spring Boot backend
- ChromaDB vector database integration
- Python scripts for data processing
- Simple web interface for interaction

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.x
- **Database**: ChromaDB vector database
- **Frontend**: HTML/JSX
- **Scripting**: Python 3.x

## Prerequisites

- Java 17+
- Python 3.8+
- Maven
- ChromaDB

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   mvn install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
4. Access the web interface at `http://localhost:8080`

## Configuration

Edit `src/main/resources/application.properties` for:
- Server port
- Database settings
- Other application properties

## Python Scripts

The project includes Python scripts for ChromaDB operations:
- `insert_chroma.py`: Insert data into ChromaDB
- `check_chroma.py`: Verify ChromaDB contents
- `rag_demo.py`: Demo of retrieval-augmented generation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
