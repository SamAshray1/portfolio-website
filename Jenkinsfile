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
                    def ec2_ip = sh(script: "cd terraform && terraform output -raw public_ip", returnStdout: true).trim()
                    if (ec2_ip) {
                        echo "EC2 Public IP: ${ec2_ip}"
                    } else {
                        error("Public IP output not found! Check Terraform state.")
                    }
                }
            }
        }
        stage('Run Ansible') {
            steps {
                dir('ansible') {
                    sh "echo '[app]' > inventory"
                    sh "echo '${ec2_ip}' >> inventory"
                    sh 'ansible-playbook -i inventory deploy.yaml'
                }
            }
        }
    }
}
