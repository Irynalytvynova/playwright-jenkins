pipeline {
    agent any // Запуск напрямую на сервере Jenkins

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Node.js & Dependencies') {
            steps {
                // Обновляем пакеты и устанавливаем Node.js прямо в контейнер Jenkins
                sh '''
                    apt-get update && apt-get install -y curl
                    curl -fsSL https://nodesource.com | bash -
                    apt-get install -y nodejs
                '''
                // Устанавливаем npm-пакеты вашего проекта
                sh 'npm ci'
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                // Устанавливаем системные библиотеки и сами браузеры для Playwright
                sh 'npx playwright install-deps'
                sh 'npx playwright install'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                // Запускаем тесты скрытно
                sh 'npx playwright test --headless'
            }
        }
    }
    
    post {
        always {
            // Публикация отчета теперь сработает внутри контекста 'agent any'
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
