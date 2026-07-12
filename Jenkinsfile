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
                // Скачиваем стабильную версию Node.js для Linux и распаковываем её встроенной командой tar
                sh '''
                    mkdir -p local_node
                    curl -fsSL https://nodejs.org | tar -xz --strip-components=1 -C local_node
                '''
            }
        }
        
        stage('Install dependencies') {
            steps {
                // Подключаем скачанный Node.js к путям выполнения
                withEnv(["PATH+NODE=${workspace}/local_node/bin"]) {
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                withEnv(["PATH+NODE=${workspace}/local_node/bin"]) {
                    // Запуск тестов в фоновом режиме на сервере
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
