
import Header from '../header/Header';
import FormTask from '../tasks/FormTask';
import ListTask from '../tasks/ListTask';

const Project = () => {
    return(
        <div>
            <div>
                <Header />
            </div>
            <div>
                <FormTask />
            </div>
            <div>
                <ListTask/>
            </div>
        </div>
    );
}

export default Project;