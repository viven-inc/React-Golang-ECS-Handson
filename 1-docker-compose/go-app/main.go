package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

type signupInfo struct {
	Email    string `json:"Email"`
	Password string `json:"Password"`
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	log.Print("call signup Handler")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	defer r.Body.Close()
	var signupinfo signupInfo
	if err := json.NewDecoder(r.Body).Decode(&signupinfo); err != nil {
		fmt.Println(err)
	}
	log.Print("Signup Email Address is ", signupinfo.Email)
	log.Print("Signup Password is ", signupinfo.Password)
	fmt.Fprintf(w, "success")
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	log.Print("health check")
	fmt.Println("health check succeeds")
	fmt.Fprintf(w, "success")
}

func main() {
	log.Print("api server starts")
	http.HandleFunc("/signup", signupHandler)
	// http.HandleFunc("/api/health", healthCheckHandler)
	http.HandleFunc("/health", func(rw http.ResponseWriter, r *http.Request) { io.WriteString(rw, "I'm healthy") })
	http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), nil)
}
