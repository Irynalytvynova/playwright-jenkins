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
                // Флаг --unsafe-perm решает проблемы с правами доступа внутри контейнеров Jenkins
                sh 'npm install --unsafe-perm'
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test --headless'
            }
        }
    }
    
    post {
        always {
            // Чтобы Jenkins не падал, если папка отчета не создалась, ставим allowMissing: true
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
