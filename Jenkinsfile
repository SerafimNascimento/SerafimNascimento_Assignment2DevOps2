pipeline {
    agent any
    environment {
        TEST_RESULT_FILE = 'test_result.txt'
        REPO_URL = 'https://github.com/SerafimNascimento/SerafimNascimento_Assignment2DevOps2.git'
        TESTING_SERVER = '54.89.222.182'
        PRODUCTION_SERVER = '54.160.189.145'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building Website...'
                // Install Node.js dependencies
                sh '''
                if ! command -v node &> /dev/null
                then
                    echo "Node.js not found. Please ensure Node.js is installed on Jenkins agent."
                    exit 1
                fi

                if [ -f package.json ]; then
                    npm install
                else
                    npm init -y
                    npm install selenium-webdriver
                fi
                '''
            }
        }

        stage('Deploy to Testing') {
            steps {
                echo 'Deploying to Testing Server...'
                // Already deployed
                // sh """
                // ssh ec2-user@$TESTING_SERVER "sudo rm -rf /var/www/html/*"
                // ssh ec2-user@$TESTING_SERVER "git clone $REPO_URL /var/www/html"
                // """
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo 'Running Selenium Tests...'
                script {
                    try {
                        sh 'node selenium-tests/test_form.js'
                        writeFile file: env.TEST_RESULT_FILE, text: 'true'
                    } catch (Exception e) {
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
                    }
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression {
                    def result = readFile(env.TEST_RESULT_FILE).trim()
                    return result == 'true'
                }
            }
            steps {
                echo 'Deploying to Production Server...'
                sh """
                ssh ec2-user@$PRODUCTION_SERVER "sudo rm -rf /var/www/html/*"
                ssh ec2-user@$PRODUCTION_SERVER "git clone $REPO_URL /var/www/html"
                """
            }
        }
    }
}