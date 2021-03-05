FROM golang:1.15.7-alpine as build
WORKDIR /go/src/simple-app
COPY main.go .
COPY healthcheck ./healthcheck
RUN go build -o app main.go 
RUN go build -o health-check "simple-app/healthcheck"

FROM alpine
WORKDIR /app/build 
COPY --from=build /go/src/simple-app/app /app/build/app
COPY --from=build /go/src/simple-app/health-check /app/build/healthcheck

HEALTHCHECK --interval=1s --timeout=1s --start-period=2s --retries=5 CMD ["./healthcheck"]
ENV PORT=8000
EXPOSE $PORT
CMD ["./app"]
