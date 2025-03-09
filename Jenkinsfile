pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
        SSH_KEY = credentials('jenkins-ssh-key')
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
                        env.REACT_APP_IP = ec2_ip
                    } else {
                        error("Public IP output not found! Check Terraform state.")
                    }
                }
            }
        }
        stage('Write SSH Key to File') {
            steps {
                script {
                    def sshKeyFile = "ansible/ssh_key.pem"  // Define path inside ansible directory

                    // Write SSH key to file
                    writeFile file: sshKeyFile, text: SSH_KEY
                    sh "chmod 600 ${sshKeyFile}"  // Secure key file

                    echo "✅ SSH Key written to ${sshKeyFile}"
                }
            }
        }

        stage('Debug Secret') {
    steps {
        script {
            sh 'echo "⚠️ DEBUG: SECRET_VALUE is $SSH_KEY"'  // Not recommended!
        }
    }
}


        stage('Run Ansible') {
            steps {
                dir('ansible') {
                    // sh "echo '[app]' > inventory"
                    // sh "echo '${REACT_APP_IP}' >> inventory"
                    sh "cat /tmp/jenkins_ssh_key.pem"
                    sh "cat inventory.ini"
                    sh "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i /tmp/jenkins_ssh_key.pem ubuntu@100.27.23.82"
                    // sh "mkdir -p ~/.ssh"
                    // sh "ssh-keyscan -H 100.27.23.82 >> ~/.ssh/known_hosts"
                    // sh "ssh-keyscan -H ${REACT_APP_IP} >> ~/.ssh/known_hosts"
                    // sh 'ansible-playbook -i inventory.ini deploy.yml -vvvv'
                    // ansiblePlaybook credentialsId: 'jenkins-ssh-key',
                    //              disableHostKeyChecking: true,
                    //              installation: 'Ansible',
                    //              inventory: 'inventory.ini',
                    //              playbook: 'deploy.yml'
                }
            }
        }

       stage('Terraform Destroy') {
            steps {
                script {
                    input message: "Proceed with Terraform Destroy?", ok: "Yes"
                }
                dir('terraform') {
                    sh 'terraform destroy -auto-approve'
                }
            }
        }
    }
}
