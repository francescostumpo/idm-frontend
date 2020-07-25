FROM openjdk:8-jdk-alpine
MAINTAINER IBM Intelligent Document Management Team
LABEL io.openshift.expose-services="8080:http"
RUN apk update && apk add bash && \
    mkdir logs && cd etc && mkdir configuration && \
    chown -R 1001:1001 /etc/configuration && \
    chown -R 1001:1001 /logs && chmod -R 777 /logs

ARG JAR_FILE=target/*.war
COPY ${JAR_FILE} app.war
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./app.war"]
