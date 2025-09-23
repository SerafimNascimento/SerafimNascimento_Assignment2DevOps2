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
                // Add build steps here if needed (npm install, etc.)
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
                ssh -i /home/ec2-user/localkey.pem -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER \\
                "sudo yum update -y && \\
                sudo yum install -y git && \\
                sudo rm -rf /var/www/html/* && \\
                sudo mkdir -p /var/www/html && \\
                sudo chown ec2-user:ec2-user /var/www/html && \\
                git clone $REPO_URL /var/www/html"
                """
                }
        }
    }
}