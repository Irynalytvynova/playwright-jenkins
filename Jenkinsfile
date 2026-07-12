pipeline {
    agent any

    tools {
        // Указываем имя инструмента, который мы сохранили в настройках Jenkins
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
                // Запуск тестов без лишних флагов (он скрытый по умолчанию)
                sh 'npx playwright test'
            }
        }
    } // Скобка, которая закрывает блок всех stages
    
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
