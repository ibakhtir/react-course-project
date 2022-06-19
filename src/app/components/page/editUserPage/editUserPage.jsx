import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";
import { useUser } from "../../../hooks/useUsers";

const EditUserPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });

  const [errors, setErrors] = useState({});
  const { professions } = useProfessions();
  const { qualities, getQuality } = useQualities();
  const { updateUsersData } = useAuth();
  const { userId } = useParams();
  const history = useHistory();

  const { getUserById } = useUser();
  const user = getUserById(userId);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    name: {
      isRequired: {
        message: "Введите ваше имя"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      const quality = getQuality(elem);
      qualitiesArray.push({
        value: quality._id,
        label: quality.name,
        color: quality.color
      });
    }
    return qualitiesArray;
  };

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      name: user.name,
      email: user.email,
      profession: user.profession,
      sex: user.sex,
      qualities: getQualities(user.qualities)
    }));
  }, []);

  const transformProfession = () => {
    return professions.map((p) => ({
      value: p._id,
      label: p.name
    }));
  };

  const transformQualities = () => {
    return qualities.map((q) => ({
      value: q._id,
      label: q.name,
      color: q.color
    }));
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    const qualityArr = [];
    for (const key of qualities) {
      qualityArr.push(key.value);
    }
    updateUsersData({
      ...data,
      _id: userId,
      profession,
      qualities: qualityArr
    });
    history.goBack();
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <SelectField
              label="Выбери свою профессию"
              defaultOption="Choose..."
              options={transformProfession()}
              name="profession"
              onChange={handleChange}
              value={data.profession}
              error={errors.profession}
            />
            <RadioField
              options={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" }
              ]}
              value={data.sex}
              name="sex"
              onChange={handleChange}
              label="Выберите ваш пол"
            />
            <MultiSelectField
              defaultValue={getQualities(user.qualities)}
              options={transformQualities()}
              onChange={handleChange}
              name="qualities"
              label="Выберите ваши качества"
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
