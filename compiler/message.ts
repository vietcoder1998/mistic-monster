export enum Message {
    success = 'success',
    over_load_err = 'overload is error',
    over_load_success = 'overload is success',
    record_success = 'record is success',
    not_found = 'not found',
    payload_not_found = 'payload is not found',
    metadata_not_found = 'metadata is not found',
    id_not_found = 'id is not found',
    method_is_not_found = 'method is not found',
    register_guard_success = 'register guard is success',
    register_guard_error = 'register guard is error',
    read_success = 'read is success',
    write_success = 'write is success',
    client_params_not_found = 'client metadata is not found',
    client_method_not_found = 'client method is not found',
    server_params_not_found = 'server metadata is not found',
    payload_typing_err = 'error typing is error',
}

export enum Code {
    success = 1,
    over_load_err = -1,
    not_found = -2,
    method_not_found = -3,
    de_serialize_err = -4,
    metadata_not_found = -5,
    payload_not_found = -6,
    payload_typing_err = -7,
    client_params_not_found = -8,
    client_method_not_found = -9,
    register_guard_error = -10,
}

export enum Method {
    read = 'read',
    write = 'write',
    overload = 'overload',
    guard = 'guard',
}

export enum Version {
    first = '0.0.1',
    last = '10.1.2',
}

export enum LoadFrom {
    file = 'file',
    json = 'json',
    string = 'string',
}

export enum HtmlSymbol {
    end_line = '&#13;&#10;',
}
