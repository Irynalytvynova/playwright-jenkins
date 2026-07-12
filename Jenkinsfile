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
                sh 'npx playwright install'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                withEnv(['CI=true']) {
                    // Просто запускаем тесты. Благодаря headless: true в конфиге, дисплей не потребуется
                    sh 'npx playwright test'
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
    }
}
