pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Скачиваем код из репозитория GitHub в рабочую папку Jenkins
                checkout scm 
            }
        }
        
        stage('Install project dependencies') {
            steps {
                // Устанавливаем пакеты с помощью Windows-команды bat
                bat 'npm install'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                // Запускаем тесты скрытно на вашем компьютере
                bat 'npx playwright test --headless'
            }
        }
    }
    
    post {
        always {
            // Публикуем HTML-отчет, если он сгенерировался
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}
