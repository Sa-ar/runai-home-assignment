import { useState } from "react";
import { Sidenav, Nav } from "rsuite";

function SideNav() {
  const [activeKey, setActiveKey] = useState("1");

  return (
    <Sidenav as="aside">
      <Sidenav.Body>
        <Nav activeKey={activeKey} onSelect={setActiveKey}>
          <Nav.Item eventKey="1" href="./departments">
            Departments
          </Nav.Item>
          <Nav.Item eventKey="2" href="./employees">
            Employees
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
}

export default SideNav;
