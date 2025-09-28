export enum ENameTableTemplateNotificationsResourses {
  emergency = "Emergencies",
  procurements = "Procurements",
  prioritizedActivities = "Prioritized_activities",
  procurementIndicative = "Procurement_indicative",
  procurementExecuted = "Procurement_executed",
}

export enum ENotificationTemplateSlug {
  emergency = "emergency-generation-notification-templates",
  procurementIndicative = "procurement-indicative-generation-notification-templates",
  procurementIndicativeUpdateStatus = "procurement-indicative-update-status-notification-templates",
  procurementExecuted = "procurement-executed-generation-notification-templates",
  procurementExecutedUpdateStatus = "procurement-executed-update-status-notification-templates",
  prioritizedActivity = "prioritized-activity-generation-notification-templates",
  validation = "validation-reviewed-notification-templates",
}


export enum EEmailTemplateTitle {
  emergency = "create_emergency",
  createProcurementIndicative = "create_procurement_indicative",
  updateStatusProcurementIndicative = "update_status_procurement_indicative",
  createProcurementExecuted = "create_procurement_executed",
  updateStatusProcurementExecuted = "update_status_procurement_executed",
  createPrioritizedActivity = "create_priorized_activity",
  validation = "validation_reviewed",
}
export enum ESubjectEmail {
  emergency = "Notificación de creación de nueva emergencia",
  prioritizedActivity = "Notificación de creación de nueva Actividad Priorizada",
  procurementIndicative = "Notificación de creación de una nueva Adquisición",
  procurementIndicativeUpdateStatus = "Notificación de actualización del estado de una Adquisición",
  procurementExecuted = "Notificación de creación de una nueva Adquisición Ejecutada",
  procurementExecutedUpdateStatus = "Notificación de actualización del estado de una Adquisición Ejecutada",
  validation = "Notificación de revisión de validación",
}