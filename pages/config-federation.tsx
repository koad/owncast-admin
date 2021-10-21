import { Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { TEXTFIELD_TYPE_TEXTAREA } from '../components/config/form-textfield';
import TextFieldWithSubmit from '../components/config/form-textfield-with-submit';
import ToggleSwitch from '../components/config/form-toggleswitch';

import { UpdateArgs } from '../types/config-section';
import {
  FIELD_PROPS_ENABLE_FEDERATION,
  TEXTFIELD_PROPS_FEDERATION_LIVE_MESSAGE,
  TEXTFIELD_PROPS_FEDERATION_DEFAULT_USER,
  FIELD_PROPS_FEDERATION_IS_PRIVATE,
  FIELD_PROPS_SHOW_FEDERATION_ENGAGEMENT,
} from '../utils/config-constants';
import { ServerStatusContext } from '../utils/server-status-context';

export default function ConfigFederation() {
  const { Title } = Typography;
  const [formDataValues, setFormDataValues] = useState(null);
  const serverStatusData = useContext(ServerStatusContext);
  const { serverConfig } = serverStatusData || {};

  const { federation } = serverConfig;
  const { enabled, isPrivate, username, goLiveMessage, showEngagement } = federation;

  const handleFieldChange = ({ fieldName, value }: UpdateArgs) => {
    setFormDataValues({
      ...formDataValues,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    setFormDataValues({
      enabled,
      isPrivate,
      username,
      goLiveMessage,
      showEngagement,
    });
  }, [serverConfig]);

  if (!formDataValues) {
    return null;
  }

  return (
    <div className="config-server-details-form">
      <Title>Federation Settings</Title>
      Explain what the Fediverse is here and talk about what happens if you were to enable this
      feature.
      <div className="form-module config-server-details-container">
        <ToggleSwitch
          fieldName="enabled"
          {...FIELD_PROPS_ENABLE_FEDERATION}
          checked={formDataValues.enabled}
        />
        <ToggleSwitch
          fieldName="isPrivate"
          {...FIELD_PROPS_FEDERATION_IS_PRIVATE}
          checked={formDataValues.isPrivate}
        />
        <TextFieldWithSubmit
          required
          fieldName="username"
          {...TEXTFIELD_PROPS_FEDERATION_DEFAULT_USER}
          value={formDataValues.username}
          initialValue={username}
          onChange={handleFieldChange}
        />
        <TextFieldWithSubmit
          required
          fieldName="goLiveMessage"
          {...TEXTFIELD_PROPS_FEDERATION_LIVE_MESSAGE}
          type={TEXTFIELD_TYPE_TEXTAREA}
          value={formDataValues.goLiveMessage}
          initialValue={goLiveMessage}
          onChange={handleFieldChange}
        />
        <ToggleSwitch
          fieldName="showEngagement"
          {...FIELD_PROPS_SHOW_FEDERATION_ENGAGEMENT}
          checked={formDataValues.showEngagement}
        />
        <br />
        <br />
      </div>
    </div>
  );
}
