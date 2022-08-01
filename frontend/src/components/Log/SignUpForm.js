import React, { useState } from "react";
import axios from "axios";
import Signinform from "./SignInForm";

//FORMULAIRE D'INSCRIPTION
const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const condition = document.getElementById("condition");
    const pseudoError = document.querySelector(".pseudoError");
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");
    const confirmPasswordError = document.querySelector(".confPasswordError");
    const conditionError = document.querySelector(".conditionError");

    confirmPasswordError.innerHTML = "";
    conditionError.innerHTML = "";

    if (password !== controlPassword || !condition.checked) {
      if (password !== controlPassword) {
        confirmPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas";
      }
      if (!condition.checked) {
        conditionError.innerHTML = "Veuillez valider les conditions gérérales";
      }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Signinform />
          <h4 className="success">
            {" "}
            Compte créé avec succès! Veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="signup-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudoError"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="emailError"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="passwordError"></div>
          <br />
          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="confirm-password"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="confPasswordError"></div>
          <br />
          <input type="checkbox" id="condition" />
          <label htmlFor="condition">
            {" "}
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              Conditions Gérérales
            </a>
          </label>
          <div className="conditionError"></div>
          <br />
          <input type="submit" value="Valider inscription" id="submit" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
