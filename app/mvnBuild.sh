#!/bin/bash

### mvnビルドの出力が文字化ける問題の対set_JAVA_OPTIONS=-Dfile.encoding=UTF-8

mvn clean package

java -jar target/instanceViewer-1.0-jar-with-dependencies.jar

