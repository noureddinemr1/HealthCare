import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Le nom est requis";
    if (!email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!object) newErrors.object = "L'objet est requis";
    if (!message) newErrors.message = "Le message est requis";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading1(true);
      await axios.post("http://localhost:3000/contact", {
        name,
        email,
        object,
        message,
      });
      toast.success("Message envoyé avec succès");
      setName("");
      setEmail("");
      setObject("");
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast.error("Échec de l'envoi du message");
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="font-[sans-serif] max-w-6xl mx-auto relative bg-white shadow-md rounded-3xl overflow-hidden mt-4">
      <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-teal-400"></div>
      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-teal-400"></div>

      <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
        <div className="text-center flex flex-col items-center justify-center">
          <img src="contact.png" className="shrink-0 w-5/6" alt="Contact" />
        </div>

        <form
          className="rounded-tl-3xl rounded-bl-3xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-2xl text-teal-400 font-bold text-center mb-6">
            Contact healthCare
          </h2>
          <div className="max-w-md mx-auto space-y-3 relative">
            <div>
              <input
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full bg-gray-100 rounded-md border-none py-3 px-4 text-sm outline-teal-500 focus:bg-transparent ${
                  errors.name
                    ? "border-red-300 focus:outline-red-300"
                    : "border-none"
                }`}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-300 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-gray-100 rounded-md border-none py-3 px-4 text-sm outline-teal-500 focus:bg-transparent ${
                  errors.email
                    ? "border-red-500 focus:outline-red-500"
                    : "border-none"
                }`}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Objet"
                value={object}
                onChange={(e) => setObject(e.target.value)}
                className={`w-full bg-gray-100 rounded-md border-none py-3 px-4 text-sm outline-teal-500 focus:bg-transparent ${
                  errors.object
                    ? "border-red-500 focus:outline-red-500"
                    : "border-none"
                }`}
                disabled={loading}
              />
              {errors.object && (
                <p className="text-red-500 text-xs mt-1">{errors.object}</p>
              )}
            </div>

            <div>
              <textarea
                placeholder="Message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full bg-gray-100 rounded-md border-none px-4 text-sm pt-3 outline-teal-500 focus:bg-transparent ${
                  errors.message
                    ? "border-red-500 focus:outline-red-500"
                    : "border-none"
                }`}
                disabled={loading}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className={`text-white w-full relative bg-teal-400 hover:bg-teal-500 rounded-md text-sm px-6 py-3 mt-6 ${
                loading1 ? "cursor-not-allowed" : ""
              }`}
              disabled={loading1}
            >
              {loading1 ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#fff"
                    className="mr-2 inline"
                    viewBox="0 0 548.244 548.244"
                  >
                    <path
                      fillRule="evenodd"
                      d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                      clipRule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                  Envoyer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
