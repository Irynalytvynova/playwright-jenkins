pipeline {
    agent {
        docker {
            // Используем официальный образ Playwright со всеми браузерами внутри
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
                // Меняем bat на Linux-команду sh
                sh 'npm ci'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                // Запускаем тесты скрытно внутри контейнера
                sh 'npx playwright test --headless'
            }
        }
    }
    
    post {
        always {
            // Теперь этот шаг сработает, так как мы установили плагин HTML Publisher
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
