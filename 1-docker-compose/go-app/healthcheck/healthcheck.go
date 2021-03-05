// I borrow code from golnag docker healthcheck repositry
// Reference : https://github.com/Soluto/golang-docker-healthcheck-example
package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	_, err := http.Get(fmt.Sprintf("http://127.0.0.1:%s/health", os.Getenv("PORT")))
	if err != nil {
		os.Exit(1)
	}
	fmt.Println("health check succeed")
}
