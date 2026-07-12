pipeline {
    agent any // Запуск на любом доступном агенте Jenkins

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Скачиваем код из GitHub
            }
        }
        
        stage('Install dependencies') {
            steps {
                bat 'npm ci' // Для Windows используется команда bat вместо sh
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                // Запускаем тесты скрытно (на сервере нет экрана)
                bat 'npx playwright test --headless' 
            }
        }
    }
    
    post {
        always {
            // Сохраняем отчёт
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}