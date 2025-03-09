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
        stage('Terraform Destroy') {
    steps {
        script {
            def userChoice = input message: "Proceed with Terraform Destroy?", parameters: [
                choice(name: 'ACTION', choices: ['Yes', 'Skip'], description: 'Choose Yes to destroy resources or Skip to continue without destroying.')
            ]
            if (userChoice == 'Yes') {
                dir('terraform') {
                    sh 'terraform destroy -auto-approve'
                }
            } else {
                echo "Skipping Terraform Destroy."
            }
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

        // stage('Write SSH Key to File') {
        //     steps {
        //         script {
        //             def sshKeyFile = "ssh_key.pem"
        //             writeFile file: sshKeyFile, text: SSH_KEY
        //             sh "chmod 600 ${sshKeyFile}"  // Secure the file
        //         }
        //     }
        // }

        // stage('SSH into EC2 & Run Commands') {
        //     steps {
        //         script {
        //             def commands = """
        //                 echo 'Running commands on EC2...'
        //                 sudo apt update -y'
        //             """

        //             sh """
        //                 ssh -o StrictHostKeyChecking=no -i ssh_key.pem ubuntu@${env.REACT_APP_IP} << 'EOF'
        //                 ${commands}
        //                 EOF
        //             """
        //         }
        //     }
        // }
        stage('Build React App in Jenkins') {
            steps {
                script {
                    sh """
                    echo '📦 Installing dependencies...'
                    npm install

                    echo '⚙️ Building the React app...'
                    CI=false npm run build

                    ls
                    """
                }
            }
        }

        stage('Upload Build Artifacts to S3') {
            steps {
                script {
                    def s3Path = "react-builds/${env.BUILD_NUMBER}/"

                    sh """
                    export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
                    export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

                    echo "📤 Uploading build artifacts to S3..."
                    aws s3 cp build s3://terraform-learning-samuel-devops/03-basics/ --recursive
                    echo "✅ Build artifacts uploaded to: s3"
                    """
                }
            }
        }

        stage('SCP Build to EC2') {
            steps {
                sshagent(['jenkins-ssh-key']) {
                    script {
                        def ec2User = 'ubuntu'
                        def projectDir = "/home/${ec2User}/portfolio-website"
                        def buildDir = "build"

                        sh """
                        echo '📡 Copying build files to EC2...'
                        scp -r -o StrictHostKeyChecking=no ${buildDir} ${ec2User}@${env.REACT_APP_IP}:${projectDir}

                        echo '✅ Build files transferred successfully!'
                        """
                    }
                }
            }
        }

        stage('Deploy React App on EC2') {
            steps {
                sshagent(['jenkins-ssh-key']) {
                    script {
                        def ec2User = 'ubuntu'
                        def projectDir = "/home/${ec2User}/portfolio-website"

                        sh """
                        ssh -o StrictHostKeyChecking=no ${ec2User}@${env.REACT_APP_IP} <<EOF

                        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                        sudo apt-get install -y nodejs

                        echo '📦 Installing dependencies...'
                        sudo npm install
                        sudo npm install -g serve

                        echo '🚀 Starting React app on EC2...'
                        cd ${projectDir}
                        nohup serve -s build -l 3000 > react.log 2>&1 &
                        echo '✅ React app is running on port 3000!'
                        
                        """
                    }
                }
            }
        }
        
        // stage('Deploy to EC2') {
        //     steps {
        //         sshagent(['jenkins-ssh-key']) {
        //             script {
        //                 def ec2User = 'ubuntu'
        //                 def projectRepo = "https://github.com/SamAshray1/portfolio-website.git"
        //                 def projectDir = "/home/${ec2User}/portfolio-website"


        //                 // Add EC2 host key to known_hosts to avoid SSH verification issues
        //                 sh """
        //                 mkdir -p ~/.ssh
        //                 ssh-keyscan -H ${env.REACT_APP_IP} >> ~/.ssh/known_hosts
        //                 """

        //                 // SSH into EC2, kill any running instances of the app, and run the new JAR
        //                 sh """
        //                 ssh -t ${ec2User}@${env.REACT_APP_IP} <<EOF
                        
        //                 curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        //                 sudo apt-get install -y nodejs

        //                 echo '✅ Node.js Version:'
        //                 node -v
        //                 echo '✅ npm Version:'
        //                 npm -v

        //                 echo '📂 Cloning the React Project...'
        //                 sudo rm -rf ${projectDir}  # Clean up any existing project
        //                 git clone ${projectRepo} ${projectDir}
        //                 cd ${projectDir}

        //                 echo '📦 Installing dependencies...'
        //                 npm install

        //                 echo '⚙️ Building the project...'
        //                 npm run build

        //                 echo '🚀 Running the React app...'
        //                 nohup npm start > react.log 2>&1 &

        //                 echo '✅ Deployment Completed Successfully!'
        //                 """
        //             }
        //         }
        //     }
        // }
        // stage('Write SSH Key to File') {
        //     steps {
        //         script {
        //             def sshKeyFile = "ansible/ssh_key.pem"  // Define path inside ansible directory

        //             // Write SSH key to file
        //             writeFile file: sshKeyFile, text: SSH_KEY
        //             sh "chmod 600 ${sshKeyFile}"  // Secure key file

        //             echo "✅ SSH Key written to ${sshKeyFile}"
        //         }
        //     }
        // }


        // stage('Run Ansible') {
        //     steps {
        //         dir('ansible') {
        //             // sh "echo '[app]' > inventory"
        //             // sh "echo '${REACT_APP_IP}' >> inventory"
        //             // sh "mkdir -p ~/.ssh"
        //             // sh "ssh-keyscan -H 100.27.23.82 >> ~/.ssh/known_hosts"
        //             // sh "ssh-keyscan -H ${REACT_APP_IP} >> ~/.ssh/known_hosts"
        //             // sh 'ansible-playbook -i inventory.ini deploy.yml -vvvv'
        //             // ansiblePlaybook credentialsId: 'jenkins-ssh-key',
        //             //              disableHostKeyChecking: true,
        //             //              installation: 'Ansible',
        //             //              inventory: 'inventory.ini',
        //             //              playbook: 'deploy.yml'
        //         }
        //     }
        // }

    }
}
