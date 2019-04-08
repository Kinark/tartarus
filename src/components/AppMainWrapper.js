import styled from 'styled-components';
import { connect } from 'react-redux'

const AppMainWrapper = styled.div`
   height: 100vh;
`;

const mapStateToProps = state => ({ darkMode: state.settings.darkMode })
export default connect(mapStateToProps)(AppMainWrapper)
