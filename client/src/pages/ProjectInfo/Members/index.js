import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProjectById } from "../../apicalls/projects";
import { SetLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import Tasks from "./Tasks";

function ProjectInfo() {
  const [project, setProject] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getData = useCallback(async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetProjectById(id);
      dispatch(SetLoading(false));
      if (response.success) {
        setProject(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
      navigate("/projects");
    }
  }, [dispatch, id, navigate]);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      {project && (
        <div>
          <h1 className="text-2xl">{project.name}</h1>
          <p>{project.description}</p>
          <Tasks projectId={project._id} />
        </div>
      )}
    </div>
  );
}

export default ProjectInfo;