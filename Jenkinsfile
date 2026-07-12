pipeline {
    agent any

    triggers {
        // Запуск каждый день ровно в 9:00 утра
        cron('0 9 * * *') 
    }

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
                    sh 'npx playwright test'
                }
            }
        }
    }
    
    post {
        always {
            // Читаем результаты тестов и выводим пункт "Test Result" в левое меню
            junit testResults: 'results.xml', allowEmptyResults: true
            
            // Архивацию папки можно оставить, чтобы файлы сохранялись на диске
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
    }
}
