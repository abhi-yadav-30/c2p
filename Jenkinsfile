// pipeline {

//     agent any

//     environment {

//         DOCKER_USERNAME = "sabhinandany"

//         BACKEND_IMAGE = "sabhinandany/code2place-backend"

//         FRONTEND_IMAGE = "sabhinandany/code2place-frontend"

//         RESOURCE_GROUP = "abhi_rg"

//         BACKEND_APP = "code2place-backend"

//         FRONTEND_APP = "code2place-frontend"
//     }

//     stages {

//         stage('Checkout Source') {

//             steps {

//                 echo "Checking out latest source..."

//                 checkout scm
//             }
//         }

//         stage('Verify Docker') {

//             steps {

//                 bat 'docker --version'

//                 bat 'docker info'
//             }
//         }

//         stage('Verify Azure CLI') {

//             steps {

//                 bat 'az --version'

//                 bat 'az account show'
//             }
//         }

//         stage('Build Backend Image') {

//             steps {

//                 echo "Building Backend..."

//                 bat """
//                 docker build ^
//                 -t %BACKEND_IMAGE%:latest ^
//                 -t %BACKEND_IMAGE%:%BUILD_NUMBER% ^
//                 backend
//                 """
//             }
//         }

//         stage('Build Frontend Image') {

//             steps {

//                 echo "Building Frontend..."

//                 bat """
//                 docker build ^
//                 -t %FRONTEND_IMAGE%:latest ^
//                 -t %FRONTEND_IMAGE%:%BUILD_NUMBER% ^
//                 web
//                 """
//             }
//         }

//         stage('Docker Login') {

//             steps {

//                 withCredentials([
//                     usernamePassword(
//                         credentialsId: 'dockerhub',
//                         usernameVariable: 'DOCKER_USER',
//                         passwordVariable: 'DOCKER_PASS'
//                     )
//                 ]) {

//                     bat '''
//                     echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
//                     '''
//                 }
//             }
//         }

//         stage('Push Backend Image') {

//             steps {

//                 bat 'docker push %BACKEND_IMAGE%:latest'

//                 bat 'docker push %BACKEND_IMAGE%:%BUILD_NUMBER%'
//             }
//         }

//         stage('Push Frontend Image') {

//             steps {

//                 bat 'docker push %FRONTEND_IMAGE%:latest'

//                 bat 'docker push %FRONTEND_IMAGE%:%BUILD_NUMBER%'
//             }
//         }

//         stage('Restart Backend App Service') {

//             steps {

//                 bat '''
//                 az webapp restart ^
//                 --resource-group %RESOURCE_GROUP% ^
//                 --name %BACKEND_APP%
//                 '''
//             }
//         }

//         stage('Restart Frontend App Service') {

//             steps {

//                 bat '''
//                 az webapp restart ^
//                 --resource-group %RESOURCE_GROUP% ^
//                 --name %FRONTEND_APP%
//                 '''
//             }
//         }

//         stage('Cleanup Local Images') {

//             steps {

//                 bat 'docker image prune -f'
//             }
//         }
//     }

//     post {

//         success {

//             echo "========================================"

//             echo "Deployment Successful"

//             echo "Backend Updated"

//             echo "Frontend Updated"

//             echo "========================================"
//         }

//         failure {

//             echo "========================================"

//             echo "Deployment Failed"

//             echo "Check Console Output"

//             echo "========================================"
//         }

//         always {

//             cleanWs()
//         }
//     }
// }

pipeline {
    agent any

    stages {
        stage('Docker Login') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )
        ]) {
            bat '''
            echo Username=%DOCKER_USER%
            powershell -Command "Write-Host PasswordLength=$($env:DOCKER_PASS.Length)"
            '''
        }
    }
}
    }
}