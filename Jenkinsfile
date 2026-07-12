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
                // Скачиваем архив Node.js 18 напрямую без использования apt-get (чтобы не было ошибок с правами)
                sh '''
                    mkdir -p local_node
                    curl -fsSL https://nodejs.org | tar -xJ --strip-components=1 -C local_node
                '''
            }
        }
        
        stage('Install project dependencies') {
            steps {
                // Прописываем путь к скачанному Node.js в системное окружение текущей сборки
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
