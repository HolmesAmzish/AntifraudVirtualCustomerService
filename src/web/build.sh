# Compile the Typescript
npm run build

# Replace the contents of Spring static resources
rm -rf ../main/resources/static/*
cp -r dist/* ../main/resources/static/
