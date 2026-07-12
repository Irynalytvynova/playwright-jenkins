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
        
        stage('Install Playwright System Linux Deps') {
            steps {
                sh 'npx playwright install-deps'
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }
        
        stage('Run Playwright tests') {
            steps {
                // CI=true активирует CI-режим в Playwright
                // xvfb-run создает виртуальный экран в оперативной памяти для корректного запуска Chromium
                withEnv(['CI=true']) {
                    sh 'xvfb-run --auto-servernum --server-args="-screen 0 1280x1024x24" npx playwright test'
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
