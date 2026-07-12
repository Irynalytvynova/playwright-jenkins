pipeline {
    agent {
        docker {
            // Официальный образ Playwright со всеми установленными браузерами и Node.js внутри
            image 'mcr.microsoft.com/playwright:v1.47.0-jammy'
            args '-u root'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install dependencies') {
            steps {
                // Чистая установка пакетов внутри контейнера Playwright
                sh 'npm ci'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                // Запуск тестов в headless режиме
                sh 'npx playwright test --headless'
            }
        }
    }
    
    post {
        always {
            // Публикация красивого HTML-отчета
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
