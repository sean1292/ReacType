import {
  ComponentInt,
  ChildInt,
  ApplicationStateInt,
  Action,
} from '../utils/Interfaces';

import {
  LOAD_INIT_DATA,
  ADD_COMPONENT,
  ADD_CHILD,
  DELETE_CHILD,
  DELETE_COMPONENT,
  TOGGLE_STATE,
  TOGGLE_CLASS,
  CHANGE_FOCUS_COMPONENT,
  CHANGE_FOCUS_CHILD,
  CHANGE_COMPONENT_FOCUS_CHILD,
  CHANGE_IMAGE_SOURCE,
  DELETE_IMAGE,
  EXPORT_FILES,
  CREATE_APPLICATION, //unsued
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  CREATE_APPLICATION_ERROR, //unused
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  OPEN_EXPANSION_PANEL,
  DELETE_ALL_DATA,
  CHANGE_IMAGE_PATH, //unused
  CHANGE_TUTORIAL,
  ADD_PROP,
  DELETE_PROP,
  UPDATE_HTML_ATTR,
  UPDATE_CHILDREN_SORT,
} from '../actionTypes/index';

import {
  addComponent,
  addChild,
  deleteChild,
  deleteComponent,
  deleteImage,
  changeFocusComponent,
  changeComponentFocusChild,
  changeFocusChild,
  changeImageSource,
  changeTutorial,
  exportFilesSuccess,
  exportFilesError,
  handleClose,
  handleTransform,
  openExpansionPanel,
  addProp,
  deleteProp,
  updateHtmlAttr,
  updateChildrenSort,
  toggleComponentState,
  toggleComponentClass,
} from '../utils/componentReducer.util';
import cloneDeep from '../utils/cloneDeep';

const appComponent: ComponentInt = {
  id: 1,
  stateful: false,
  classBased: false,
  title: 'App',
  color: '#FF6D00',
  props: [],
  nextPropId: 1,
  position: {
    x: 25,
    y: 25,
    width: 600,
    height: 400,
  },
  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0,
};

const initialApplicationFocusChild: ChildInt = {
  childId: 0,
  componentName: null,
  position: {
    x: 25,
    y: 25,
    width: 800,
    height: 550,
  },
  childType: null,
  childSort: 0,
  childComponentId: 0,
  color: null,
  htmlElement: null,
  HTMLInfo: null,
};

const initialApplicationState: ApplicationStateInt = {
  tutorial: 0,
  imageSource: '',
  totalComponents: 1,
  nextId: 2,
  successOpen: false,
  errorOpen: false,
  focusComponent: appComponent,
  selectableChildren: [],
  ancestors: [],
  initialApplicationFocusChild,
  focusChild: cloneDeep(initialApplicationFocusChild),
  components: [appComponent],
  appDir: '',
  loading: false,
};

const componentReducer = (state = initialApplicationState, action: Action) => {
  switch (action.type) {
    case LOAD_INIT_DATA:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        appDir: '',
        successOpen: false,
        errorOpen: false,
      };
    case ADD_COMPONENT:
      return addComponent(state, action.payload);
    case ADD_CHILD:
      return addChild(state, action.payload);
    case DELETE_CHILD:
      return deleteChild(state, action.payload);
    case DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    case TOGGLE_STATE:
      return toggleComponentState(state, action.payload);
    case TOGGLE_CLASS:
      return toggleComponentClass(state, action.payload);
    case CHANGE_FOCUS_COMPONENT:
      return changeFocusComponent(state, action.payload);
    case CHANGE_FOCUS_CHILD:
      return changeFocusChild(state, action.payload);
    case CHANGE_COMPONENT_FOCUS_CHILD:
      return changeComponentFocusChild(state, action.payload);
    case CHANGE_IMAGE_SOURCE:
      return changeImageSource(state, action.payload);
    case CHANGE_TUTORIAL:
      return changeTutorial(state, action.payload);
    case DELETE_IMAGE:
      return deleteImage(state);
    case EXPORT_FILES:
      return { ...state, loading: true };
    case EXPORT_FILES_SUCCESS:
      return exportFilesSuccess(state, action.payload);
    // case CREATE_APPLICATION_ERROR:
    case EXPORT_FILES_ERROR:
      return exportFilesError(state, action.payload);
    case HANDLE_CLOSE:
      return handleClose(state, action.payload);
    case HANDLE_TRANSFORM:
      return handleTransform(state, action.payload);
    case OPEN_EXPANSION_PANEL:
      return openExpansionPanel(state, action.payload);
    case DELETE_ALL_DATA:
      return initialApplicationState;
    case ADD_PROP:
      return addProp(state, action.payload);
    case DELETE_PROP:
      return deleteProp(state, action.payload);
    case UPDATE_HTML_ATTR:
      return updateHtmlAttr(state, action.payload);
    case UPDATE_CHILDREN_SORT:
      return updateChildrenSort(state, action.payload);
    default:
      return state;
  }
};

export default componentReducer;
