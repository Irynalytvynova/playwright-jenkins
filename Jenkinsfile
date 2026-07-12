pipeline {
    agent any

    tools {
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
                sh 'npm install --unsafe-perm'
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                // Скачиваем необходимые браузеры прямо в контейнер Jenkins
                sh 'npx playwright install'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
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
