pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Node.js') {
            steps {
                // Скачиваем архив .tar.gz — он распакуется на любой машине без дополнительных утилит
                sh '''
                    mkdir -p local_node
                    curl -fsSL https://nodejs.org | tar -xz --strip-components=1 -C local_node
                '''
            }
        }
        
        stage('Install project dependencies') {
            steps {
                withEnv(["PATH+NODE=${workspace}/local_node/bin"]) {
                    sh 'npm install --unsafe-perm'
                }
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                withEnv(["PATH+NODE=${workspace}/local_node/bin"]) {
                    sh 'npx playwright install'
                }
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                withEnv(["PATH+NODE=${workspace}/local_node/bin"]) {
                    sh 'npx playwright test --headless'
                }
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