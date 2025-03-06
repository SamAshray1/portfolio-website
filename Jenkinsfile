pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
    }
    stages {
        stage('Git Checkout') {
            steps {
               git branch: 'main', credentialsId: 'github-username', url: 'https://github.com/SamAshray1/portfolio-website.git'
            }
        }
        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }
        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }
        stage('Extract EC2 IP') {
            steps {
                script {
                    def output = sh(script: "terraform output ec2_public_dns", returnStdout: true).trim()
                    env.REACT_APP_IP = output
                }
            }
        }
        stage('Run Ansible') {
            steps {
                dir('ansible') {
                    sh "echo '[app]' > inventory"
                    sh "echo '${REACT_APP_IP}' >> inventory"
                    sh 'ansible-playbook -i inventory ansible/deploy.yaml'
                }
            }
        }
    }
}
