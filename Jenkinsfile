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
        
        // Шаг 'Install Playwright System Linux Deps' УДАЛЕН, чтобы избежать зависания прав в Docker
        
        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                withEnv(['CI=true']) {
                    // xvfb-run берет на себя создание виртуального экрана
                    sh 'xvfb-run --auto-servernum --server-args="-screen 0 1280x1024x24" npx playwright test'
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
