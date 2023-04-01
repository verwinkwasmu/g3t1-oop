# navigate to the project root directory
cd ../ || exit

# create the bin directory if it doesn't exist
mkdir -p bin

# build the project using Maven and output the result to the bin directory
./mvnw clean package
cp target/*[!original].jar bin/