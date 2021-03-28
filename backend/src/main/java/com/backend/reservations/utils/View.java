package com.backend.reservations.utils;

public class View {
    public static interface Public {}
    public static interface ExtendedPublic extends Public {}
    public static interface Internal extends ExtendedPublic {}

    public static interface InternalBusiness extends ExtendedPublic {}
    public static interface InternalReservation extends ExtendedPublic {}
    public static interface InternalUser extends ExtendedPublic {}

    public static interface InternalUserAndBusiness extends InternalUser, InternalBusiness {}
}
