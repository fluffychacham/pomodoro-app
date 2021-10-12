---
to: src/components/<%=name%>/<%=name%>.tsx
---
import { FunctionComponent } from 'react';

import style from './<%=name%>.module.scss';

/**
 * <%= h.changeCase.sentence(name) %> react component.
 *
 * @return Tsx
 */
export const <%=name%>: FunctionComponent = () => {
  return (
    <div className={style.container}>

    </div>
  );
}
