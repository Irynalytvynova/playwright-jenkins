pipeline {
    agent any

    tools {
        // Указываем имя инструмента, который мы только что сохранили в настройках Jenkins
        nodejs 'node18'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install dependencies') {
            steps {
                // Ставим пакеты вашего проекта без конфликтов прав доступа
                sh 'npm install --unsafe-perm'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                // Запускаем ваши тесты Playwright в фоновом режиме
                sh 'npx playwright test --headless'
            }
        }
    }
    
    post {
        always {
            // Публикуем HTML-отчет
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
