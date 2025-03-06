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
                    
                    // Write the private key to a temporary file
                    def sshKeyFile = "/tmp/jenkins_ssh_key.pem"
                    writeFile file: sshKeyFile, text: SSH_KEY
                    sh "chmod 600 ${sshKeyFile}"  // Secure the private key file

                    // Create Ansible inventory dynamically
                    writeFile file: 'ansible/inventory.ini', text: """[react-server]
${ec2_ip} ansible_user=ubuntu ansible_ssh_private_key_file=${sshKeyFile}"""
                    if (ec2_ip) {
                        echo "EC2 Public IP: ${ec2_ip}"
                        env.REACT_APP_IP = ec2_ip
                    } else {
                        error("Public IP output not found! Check Terraform state.")
                    }
                }
            }
        }

        stage('Terraform Destroy') {
            steps {
                dir('terraform') {
                    sh 'terraform destroy -auto-approve'
                }
            }
        }

        stage('Test SSH Connection') {
            steps {
                script {
                    def ssh_test = sh(script: """
                        eval \$(ssh-agent -s)
                        ssh-add /tmp/jenkins_ssh_key.pem
                        ssh -o StrictHostKeyChecking=no ubuntu@${env.REACT_APP_IP} "echo SSH Connection Successful"
                    """, returnStatus: true)
                    
                    if (ssh_test != 0) {
                        error("SSH connection failed. Check private key and permissions.")
                    }
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

        // stage('Terraform Destroy') {
        //     steps {
        //         dir('terraform') {
        //             sh 'terraform destroy -auto-approve'
        //         }
        //     }
        // }
    }
}
