import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const EditPage = () => {
  const [user, setUser] = useState({});
  const [professions, setProfession] = useState();
  const [qualities, setQualities] = useState([]);

  const history = useHistory();
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleChange = (target) => {
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleChangeForProfessions = (target) => {
    for (const prof of professions) {
      if (prof.value === target.value) {
        setUser((prevState) => ({
          ...prevState,
          [target.name]: { _id: prof.value, name: prof.label }
        }));
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const el of elements) {
      for (const qual in qualities) {
        if (el.value === qualities[qual].value) {
          qualitiesArray.push({
            _id: qualities[qual].value,
            name: qualities[qual].label,
            color: qualities[qual].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.users.update(userId, {
      ...user,
      qualities: getQualities(user.qualities)
    });
    history.replace(`/users/${user._id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-md-6 offset-md-3 shadow p-4 mt-5">
        {user && professions && qualities ? (
          <>
            <TextField
              label="Имя"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              label="Электронная почта"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <SelectField
              label="Профессия"
              defaultOption={user.profession.name}
              name="profession"
              options={professions}
              value=""
              onChange={handleChangeForProfessions}
            />
            <RadioField
              label="Пол"
              name="sex"
              options={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" }
              ]}
              value={user.sex}
              onChange={handleChange}
            />
            <MultiSelectField
              label="Качества"
              defaultValue={user.qualities.map((el) => {
                return {
                  label: el.name,
                  value: el._id,
                  color: el.color
                };
              })}
              name="qualities"
              options={qualities}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary w-100 mx-auto">
              Обновить
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </form>
  );
};

export default EditPage;
