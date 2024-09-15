import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  photo: FileList;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  emails: { email: string }[];
  phones: { phone: string }[];
  appointmentTime: string;
  comment?: string;
  acceptTerms: boolean;
};

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm<FormData>({
    mode: "onChange",
  });
  const {
    fields: emailFields,
    append: addEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: "emails" });
  const {
    fields: phoneFields,
    append: addPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phones" });

  const [submissionLoading, setSubmissionLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setSubmissionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setSubmissionLoading(false);
    navigate("/");
  };

  const isOver18 = (date: string) => {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(date).getFullYear();
    return currentYear - birthYear >= 18;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="hidden md:block md:w-1/3 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/11045874/pexels-photo-11045874.jpeg?auto=compress&cs=tinysrgb&w=600)",
        }}
      ></div>
      <div className="w-full md:w-2/3 p-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Formulaire d'inscription</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-center w-full mb-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">
                    Cliquez pour télécharger
                  </span>{" "}
                  ou faites glisser et déposez
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG ou GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/png, image/jpeg"
                {...register("photo", {
                  required: "Veuillez télécharger une photo",
                })}
                className="hidden"
              />
            </label>
          </div>
          {errors.photo && (
            <span className="text-red-500 text-sm">{errors.photo.message}</span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-6">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "Le prénom est obligatoire",
                })}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Le nom est obligatoire",
                })}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-6">
              <label
                htmlFor="birthDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date de naissance
              </label>
              <input
                type="date"
                id="birthDate"
                {...register("birthDate", {
                  required: "La date de naissance est obligatoire",
                  validate: (value) =>
                    isOver18(value) || "Vous devez avoir au moins 18 ans",
                })}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.birthDate ? "border-red-500" : ""
                }`}
              />
              {errors.birthDate && (
                <span className="text-red-500 text-sm">
                  {errors.birthDate.message}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="appointmentTime"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Heure de rendez-vous
              </label>
              <input
                type="time"
                id="appointmentTime"
                {...register("appointmentTime", {
                  required: "L'heure de rendez-vous est obligatoire",
                  validate: (value) => {
                    const [hours] = value.split(":").map(Number);
                    const isValidTime =
                      (hours >= 6 && hours < 12) || (hours >= 15 && hours < 24);
                    return (
                      isValidTime ||
                      "L'heure doit être entre 06h et 12h ou 15h et 00h"
                    );
                  },
                })}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors.appointmentTime ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.appointmentTime && (
                <span className="text-red-500 text-sm">
                  {errors.appointmentTime.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Emails
              </label>
              <AnimatePresence>
                {emailFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    className="mt-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <input
                          type="email"
                          placeholder="exemple@gmail.com"
                          {...register(`emails.${index}.email`, {
                            required: "L'email est obligatoire",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Email invalide",
                            },
                          })}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                            errors.emails?.[index]?.email
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md`}
                        />
                        <button
                          type="button"
                          onClick={() => removeEmail(index)}
                          className="text-white border border-gray-900 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-r-lg text-sm p-2.5 text-center"
                        >
                          <i className="ri-delete-bin-7-line"></i>
                        </button>
                      </div>
                      <div>
                        {errors.emails?.[index]?.email && (
                          <span className="text-red-500">
                            {errors.emails[index].email?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => addEmail({ email: "" })}
                className="mt-2 text-blue-500 hover:text-blue-700"
              >
                Ajouter un email
              </button>
              {errors.emails && (
                <span className="text-red-500 text-sm">
                  {errors.emails.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <AnimatePresence>
                {phoneFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    className="mt-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <input
                          type="tel"
                          placeholder="+242069900220"
                          {...register(`phones.${index}.phone`, {
                            required: "Le téléphone est obligatoire",
                            pattern: {
                              value: /^\+242\d{2}\d{3}\d{4}$/,
                              message: "Numéro invalide",
                            },
                          })}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                            errors.phones?.[index]?.phone
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md`}
                        />
                        <button
                          type="button"
                          onClick={() => removePhone(index)}
                          className="text-white border border-gray-900 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-r-lg text-sm p-2.5 text-center"
                        >
                          <i className="ri-delete-bin-7-line"></i>
                        </button>
                      </div>
                      <div>
                        {errors.phones?.[index]?.phone && (
                          <span className="text-red-500">
                            {errors.phones[index].phone?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => addPhone({ phone: "" })}
                className="mt-2 text-blue-600 hover:underline"
              >
                Ajouter un téléphone
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Commentaire (Optionnel)
            </label>
            <textarea
              id="comment"
              {...register("comment", {
                minLength: { value: 20, message: "Minimum 20 caractères" },
                maxLength: { value: 200, message: "Maximum 200 caractères" },
              })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.comment ? "border-red-500" : ""
              }`}
              rows={4}
            />
            {errors.comment && (
              <span className="text-red-500 text-sm">
                {errors.comment.message}
              </span>
            )}
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="acceptTerms"
              {...register("acceptTerms", {
                required: "Vous devez accepter les termes pour soumettre",
              })}
              className="w-4 h-4 text-blue-600 bg-red-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="acceptTerms"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              J'accepte les{" "}
              <span className="text-blue-600 cursor-pointer">
                termes et conditions d'utilisation
              </span>
            </label>
          </div>
          {errors.acceptTerms && (
            <span className="text-red-500 text-sm">
              {errors.acceptTerms.message}
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isValid || submissionLoading}
            className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:ring-gray-700 bg-gray-800 border-gray-600 text-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submissionLoading ? "Envoi en cours..." : "Soumettre"}
          </button>
        </form>

        <div
          className={`fixed bottom-4 right-4 p-4 bg-gray-900 text-white rounded-lg ${
            submissionLoading ? "block" : "hidden"
          }`}
        >
          <p>
            Formulaire soumis avec succès
            <i className="ml-1 ri-checkbox-circle-fill"></i>
          </p>
          <button
            onClick={() => setSubmissionLoading(false)}
            className="mt-2 text-white underline font-bold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
